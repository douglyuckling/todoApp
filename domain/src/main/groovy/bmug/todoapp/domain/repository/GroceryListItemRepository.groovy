package bmug.todoapp.domain.repository

import bmug.todoapp.domain.GroceryListItem

interface GroceryListItemRepository {

    Collection<GroceryListItem> getItems()

    Collection<GroceryListItem> saveItems(Collection<GroceryListItem> items)

    void deleteItemById(String itemId)

}
