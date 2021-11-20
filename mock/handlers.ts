import { graphql } from 'msw'

export const handlers = [
    graphql.query('GetUsers', (req, res, ctx) => {
        return res(
            ctx.data({
                users: [
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000a',
                        name: 'Test user A',
                        created_at: '2021-01-01T13:47:23.308833+00:00',
                    },
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000b',
                        name: 'Test user B',
                        created_at: '2021-02-02T13:47:23.308833+00:00',
                    },
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000c',
                        name: 'Test user C',
                        created_at: '2021-03-03T13:47:23.308833+00:00',
                    },
                ],
            })
        )
    }),
    graphql.query('GetUserIDs', (req, res, ctx) => {
        return res(
            ctx.data({
                users: [
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000a',
                    },
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000b',
                    },
                    {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000c',
                    },
                ],
            })
        )
    }),
    graphql.query('GetUserById', (req, res, ctx) => {
        const { id } = req.variables
        if (id === 'b39ec6cc-9d85-458d-aa0e-00000000000a') {
            return res(
                ctx.data({
                    users_by_pk: {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000a',
                        name: 'Test user A',
                        created_at: '2021-01-01T13:47:23.308833+00:00',
                    }
                })
            )
        }
        if (id === 'b39ec6cc-9d85-458d-aa0e-00000000000b') {
            return res(
                ctx.data({
                    users_by_pk: {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000b',
                        name: 'Test user B',
                        created_at: '2021-02-02T13:47:23.308833+00:00',
                    }
                })
            )
        }
        if (id === 'b39ec6cc-9d85-458d-aa0e-00000000000c') {
            return res(
                ctx.data({
                    users_by_pk: {
                        __typename: 'users',
                        id: 'b39ec6cc-9d85-458d-aa0e-00000000000c',
                        name: 'Test user C',
                        created_at: '2021-03-03T13:47:23.308833+00:00',
                    }
                })
            )
        }
    }),
]
