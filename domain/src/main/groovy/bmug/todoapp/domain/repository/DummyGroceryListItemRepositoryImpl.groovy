package bmug.todoapp.domain.repository

import bmug.todoapp.domain.GroceryListItem
import org.springframework.util.StringUtils

class DummyGroceryListItemRepositoryImpl implements GroceryListItemRepository {

    private Map<String, GroceryListItem> itemsById = new LinkedHashMap<>()

    DummyGroceryListItemRepositoryImpl() {
        storeItem(new GroceryListItem('milk', 'gallon'))
        storeItem(new GroceryListItem('eggs', 2, 'dozen'))
        storeItem(new GroceryListItem('bread', 'loaf'))
    }

    @Override
    Collection<GroceryListItem> getItems() {
        return new ArrayList<>(itemsById.values())
    }

    @Override
    Collection<GroceryListItem> saveItems(Collection<GroceryListItem> items) {
        List<GroceryListItem> savedItems = new ArrayList<>(items.size())
        for (GroceryListItem item : items) {
            if (!StringUtils.hasText(item.getId())) {
                item = new GroceryListItem(item.getName(), item.getQuantity(), item.getUnit())
            }
            savedItems.add(item)
            storeItem(item)
        }
        return savedItems
    }

    @Override
    void deleteItemById(String itemId) {
        itemsById.remove(itemId)
    }

    void storeItem(GroceryListItem item) {
        this.itemsById.put(item.getId(), item)
    }

}
