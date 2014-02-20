package bmug.todoapp.domain

import groovy.transform.EqualsAndHashCode

@EqualsAndHashCode(includes = 'id')
class Task {
    String id
    String summary
    int priority
    String context

    private setId(String newId) {
        if (id) throw new IllegalStateException('Changing the ID of a task is forbidden')
        id = newId
    }
}
