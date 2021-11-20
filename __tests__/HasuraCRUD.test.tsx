/**
* @jest-environment jsdom
*/
import { render, screen, cleanup } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from "../mock/handlers"
import 'setimmediate'
import { setupEnv } from "../test/setupEnv" 

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})
afterEach(() => {
    server.resetHandlers()
    cleanup()
})
afterAll(() => {
    server.close()
})


describe('Hasura CRUD Test Case', () => {
    it ('Should render the list of users by useQuery', async () => {
        await setupEnv()

       const { page } = await getPage({
           route: '/hasura-crud',
       })
       render(page)
       expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
       expect(await screen.findByText('Test user A')).toBeInTheDocument()
       expect(screen.getByText('2021-01-01T13:47:23.308833+00:00')).toBeInTheDocument()
       expect(screen.getByTestId('edit-b39ec6cc-9d85-458d-aa0e-00000000000a')).toBeTruthy()
       expect(screen.getByTestId('delete-b39ec6cc-9d85-458d-aa0e-00000000000a')).toBeTruthy()
       expect(screen.getByText('Test user B')).toBeInTheDocument()
       expect(screen.getByText('2021-02-02T13:47:23.308833+00:00')).toBeInTheDocument()
       expect(screen.getByTestId('edit-b39ec6cc-9d85-458d-aa0e-00000000000b')).toBeTruthy()
       expect(screen.getByTestId('delete-b39ec6cc-9d85-458d-aa0e-00000000000b')).toBeTruthy()
       expect(screen.getByText('Test user C')).toBeInTheDocument()
       expect(screen.getByText('2021-03-03T13:47:23.308833+00:00')).toBeInTheDocument()
       expect(screen.getByTestId('edit-b39ec6cc-9d85-458d-aa0e-00000000000c')).toBeTruthy()
       expect(screen.getByTestId('delete-b39ec6cc-9d85-458d-aa0e-00000000000c')).toBeTruthy()
    })
})
