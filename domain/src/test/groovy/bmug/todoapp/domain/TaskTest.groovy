package bmug.todoapp.domain

import spock.lang.Specification

class TaskTest extends Specification {

    def "we can ensure that a task has an ID"() {
        given:
        Task task = new Task(summary: "a task")
        assert task.@id == null

        when:
        task.ensureId()

        then:
        task.@id
    }

    def "accessing the ID of a task without an ID causes an ID to be assigned"() {
        given:
        Task task = new Task(summary: "a task")
        assert task.@id == null

        expect:
        task.id
    }

}
