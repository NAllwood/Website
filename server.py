import tornado.web
import tornado.autoreload
import tornado.ioloop
import os
import json

settings = {
    'debug': True,
    'static_path': os.path.join(os.path.dirname(__file__), 'static'),
    'template_path' :os.path.join(os.path.dirname(__file__), "static/templates")
}

class MainHandler(tornado.web.RequestHandler):
    def get(self):
            articlesList = filter(lambda x: x != "basic.html", os.listdir(os.path.join(os.path.dirname(__file__), "static/templates")))
            js_path = os.path.join('static', 'scripts')
            self.render("basic.html", articlesList=articlesList)


handlers = [
    (r'/', MainHandler)
]

def signal_handler(signum, frame):
    tornado.ioloop.IOLoop.current().stop()

if __name__ == "__main__":
    app = tornado.web.Application(handlers, **settings)
    app.listen(8080)
    tornado.autoreload.start()
    print("Server loaded")

    #reload server everytime a file changes (debug)
    for dir,_,files in os.walk("."):
        [tornado.autoreload.watch(os.path.join(dir, f)) for f in files if not f.startswith('.')]

tornado.ioloop.IOLoop.current().start()
