package bmug.todoapp.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import bmug.todoapp.domain.GroceryListItem
import bmug.todoapp.services.GroceryListService

import static org.springframework.web.bind.annotation.RequestMethod.DELETE
import static org.springframework.web.bind.annotation.RequestMethod.GET
import static org.springframework.web.bind.annotation.RequestMethod.POST
import static org.springframework.web.bind.annotation.RequestMethod.PUT

@Controller
@RequestMapping('/data/grocerylist')
class GroceryListController {

    @Autowired
    private GroceryListService groceryListService

    @RequestMapping(value = ['','/'], method = GET)
    @ResponseBody
    List<GroceryListItem> getGroceryList() {
        return new ArrayList<>(groceryListService.getItems())
    }

    @RequestMapping(value = ['', '/'], method = POST)
    @ResponseBody
    List<GroceryListItem> createGroceryListItems(@RequestBody List<GroceryListItem> newItems) {
        return new ArrayList<>(groceryListService.saveItems(newItems))
    }

    @RequestMapping(value = '/{itemId}', method = PUT)
    @ResponseBody
    List<GroceryListItem> updateGroceryListItem(@PathVariable('itemId') String itemId,
                                                @RequestBody List<GroceryListItem> modifiedItems) {
        return new ArrayList<>(groceryListService.saveItems(modifiedItems))
    }

    @RequestMapping(value = '/{itemId}', method = DELETE)
    @ResponseBody
    void deleteGroceryListItem(@PathVariable('itemId') String itemId) {
        groceryListService.deleteItemById(itemId)
    }

}