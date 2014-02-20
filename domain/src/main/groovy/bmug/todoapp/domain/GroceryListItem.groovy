package bmug.todoapp.domain

class GroceryListItem {
    private String id
    private String name
    private int quantity
    private String unit

    GroceryListItem() {
    }

    GroceryListItem(String name, int quantity, String unit) {
        this.id = UUID.randomUUID().toString()
        this.name = name.trim()
        this.quantity = quantity
        this.unit = unit
    }

    GroceryListItem(String name, String unit) {
        this(name, 1, unit)
    }

    String getId() {
        return id
    }

    String getName() {
        return name
    }

    int getQuantity() {
        return quantity
    }

    String getUnit() {
        return unit
    }

    @Override
    boolean equals(Object o) {
        if (this == o) return true
        if (o == null || getClass() != o.getClass()) return false

        GroceryListItem that = (GroceryListItem) o

        if (!id.equals(that.id)) return false

        return true
    }

    @Override
    int hashCode() {
        return id.hashCode()
    }

}
