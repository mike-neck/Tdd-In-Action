@Grab ('org.eclipse.jetty:jetty-server:7.5.4.v20111024')
@Grab ('javax.servlet:servlet-api:2.5')
@Grab ('org.slf4j:slf4j-api:1.6.6')
@Grab ('org.slf4j:slf4j-log4j12:1.6.6')
@Grab ('log4j:log4j:1.2.17')

import org.eclipse.jetty.server.*
import org.eclipse.jetty.server.handler.*

import javax.servlet.http.*
import groovy.io.*
import groovy.xml.MarkupBuilder
import groovy.util.logging.*

IntRange.metaClass.define {
    random = {
        def low  = delegate.to < delegate.from ? delegate.to : delegate.from
        def high = delegate.to < delegate.from ? delegate.from : delegate.to
        def size = high - low + 1
        return low + new Random().nextInt(size)
    }
}
Integer.metaClass.define {
    collect = {Closure closure ->
        def result = []
        delegate.times {
            result << closure (it)
        }
        result
    }
}
HttpServletRequest.metaClass.define {
    asInt = {String key, int defaultValue ->
        def value = delegate.getParameter(key)
        if (value) {
            try {
                int number = Integer.parseInt(value)
                return number
            } catch (NumberFormatException e) {
            }
        }
        return defaultValue
    }
    asBoolean = {String key, boolean defaultValue ->
        def value = delegate.getParameter(key)
        if (value) {
            return Boolean.parseBoolean(value)
        }
        return defaultValue
    }
}

@Slf4j
class Handler extends AbstractHandler {
    Server server
    Map<String, File> map = [:]
    def types = [
        html : [type : 'text/html',       proc : {HttpServletResponse res, File file -> file.eachLine {res.writer << it; res.writer << '\n'}; res.writer.flush()}],
        css  : [type : 'text/css',        proc : {HttpServletResponse res, File file -> file.eachLine {res.writer << it; res.writer << '\n'}; res.writer.flush()}],
        js   : [type : 'text/javascript', proc : {HttpServletResponse res, File file -> file.eachLine {res.writer << it; res.writer << '\n'}; res.writer.flush()}],
        jpeg : [type : 'image/jpeg',      proc : {HttpServletResponse res, File file -> file.eachByte {res.outputStream.write it}; res.outputStream.flush()}],
        jpg  : [type : 'image/jpeg',      proc : {HttpServletResponse res, File file -> file.eachByte {res.outputStream.write it}; res.outputStream.flush()}],
        png  : [type : 'image/png',       proc : {HttpServletResponse res, File file -> file.eachByte {res.outputStream.write it}; res.outputStream.flush()}],
        gif  : [type : 'image/gif',       proc : {HttpServletResponse res, File file -> file.eachByte {res.outputStream.write it}; res.outputStream.flush()}],
        ico  : [type : 'text/plain',      proc : {HttpServletResponse res, File file -> file.eachByte {res.outputStream.write it}; res.outputStream.flush()}]
    ]
    static Handler init(Server s) {
        def g = new Handler(server : s)
        g.load()
        return g
    }
    void load() {
        map << ['/' : new File('index.html')]
        new File('.').eachFileRecurse(FileType.FILES) {
            map << [(it.toPath().toString().replace('./','/').replace('\\', '/')): it]
        }
    }
    @Override
    void handle(String target, Request r, HttpServletRequest req, HttpServletResponse res) {
        println "${new Date().format('yyyy/MM/dd hh:mm:ss')} request $target"
        if (target == '/end') {
            finish(res)
        } else if (target == '/reflesh') {
            map = [:]
            load()
            found (res, '/')
        } else if (target == '/random') {
            random (res, req)
        } else if (!map[target]) {
            map = [:]
            load()
            if (!map[target])
                notFound(res)
            else
                notFound(res)
        } else {
            found (res, target)
        }
    }

    def random = {HttpServletResponse res, HttpServletRequest req ->
        res.status = 200
        res.contentType = 'application/json'
        def size = req.asInt('size',  30)
        def from = req.asInt('from',   0)
        def to =   req.asInt('to',   100)
        def sort = req.asBoolean('sort', false)
        def range = new IntRange(from, to)
        def result = size.collect {range.random()}
        if (sort) {
            res.writer << result.sort()
        } else {
            res.writer << result
        }
        res.flush()
    }

    def found = {HttpServletResponse res, String req ->
        def file = map[req].name
        def ext = file.substring(file.lastIndexOf('.') + 1)
        println ext
        def item = types[ext]
        if (item != null) {
            res.status = 200
            res.contentType = item.type
            item.proc (res, map[req])
        } else {
            res.status = 400
            res.writer << '<!DOCTYPE html>\n'
            def doc = new MarkupBuilder(res.writer)
            doc.html {
                head {
                    title ('bad request')
                }
                body {
                    p ("Your request ${req} is not supported on this server!")
                }
            }
            res.writer.flush()
        }
    }

    def notFound = {HttpServletResponse res ->
        res.status = 404
        res.contentType = 'text/html'
        res.writer << '<!DOCTYPE html>\n'
        def doc = new MarkupBuilder(res.writer)
        doc.html(lang : 'ja') {
            head {
                title ('not found')
            }
            body {
                p ("The content you requested is not found.")
            }
        }
        res.writer.flush()
    }

    def finish = {HttpServletResponse res ->
        res.status = 200
        res.contentType = 'text/html'
        res.writer << '<!DOCTYPE html>\n'
        def doc = new MarkupBuilder(res.writer)
        doc.html(lang : 'ja') {
            head{
                title ('end')
            }
            body {
                h3 ('server finished')
            }
        }
        res.writer.flush()
        server.stop()
    }
}

def inet = new InetSocketAddress(3040)
def server = new Server(inet)
server.setHandler(Handler.init(server))

server.start()
