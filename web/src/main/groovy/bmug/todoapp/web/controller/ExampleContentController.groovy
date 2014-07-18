package bmug.todoapp.web.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

import static org.springframework.web.bind.annotation.RequestMethod.GET

@Controller
@RequestMapping('/')
class ExampleContentController {

    @Value('${application.web.content.message}')
    private String message

    @RequestMapping(value = '/', method = GET)
    ModelAndView getIndex() {
        def model = new ModelAndView('index')
        model.addObject('message', message)
        return model
    }

    @RequestMapping(value = '/test.html', method = GET)
    ModelAndView getTest() {
        def model = new ModelAndView('test')
        return model
    }

}
