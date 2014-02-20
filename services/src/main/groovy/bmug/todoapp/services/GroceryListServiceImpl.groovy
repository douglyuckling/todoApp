package bmug.todoapp.services

import bmug.todoapp.domain.GroceryListItem
import bmug.todoapp.domain.repository.GroceryListItemRepository
import org.springframework.beans.factory.annotation.Autowired

class GroceryListServiceImpl implements GroceryListService {

    @Autowired
    private GroceryListItemRepository repository

    @Override
    Collection<GroceryListItem> getItems() {
        return repository.getItems()
    }

    @Override
    Collection<GroceryListItem> saveItems(Collection<GroceryListItem> items) {
        return repository.saveItems(items)
    }

    @Override
    void deleteItemById(String itemId) {
        repository.deleteItemById(itemId)
    }

}
