package bmug.todoapp.services;

import bmug.todoapp.domain.GroceryListItem;

import java.util.Collection;

public interface GroceryListService {

    Collection<GroceryListItem> getItems();

    Collection<GroceryListItem> saveItems(Collection<GroceryListItem> items);

    void deleteItemById(String itemId);

}
