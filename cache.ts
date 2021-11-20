import { makeVar } from "@apollo/client";

interface Task {
    title: String
}

export const todoVar = makeVar<Task[]> ([])


