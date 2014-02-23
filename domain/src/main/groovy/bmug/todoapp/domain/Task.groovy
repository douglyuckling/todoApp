package bmug.todoapp.domain

import groovy.transform.EqualsAndHashCode

@EqualsAndHashCode(includes = 'id')
class Task {
    String id
    String summary
    int priority
    String context
    boolean complete = false

    // Jackson gets confused when there are two auto-generated getters.
    boolean getComplete() {
        return complete
    }

    void ensureId() {
        if (!id) {
            setId(UUID.randomUUID().toString())
        }
    }

    String getId() {
        ensureId()
        return id
    }

    private setId(String newId) {
        id = newId
    }

}
