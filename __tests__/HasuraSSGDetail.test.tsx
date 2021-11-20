/**
* @jest-environment jsdom
*/
import { render, screen, cleanup } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
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


describe('UserDetail Test Case', () => {
    it ('Should render the user detail pre-fetched by getStaticProps', async () => {
        await setupEnv()

        const { page } = await getPage({
            route: '/users/b39ec6cc-9d85-458d-aa0e-00000000000a', // Test user A
        })
        render(page)
        expect(await screen.findByText('User detail')).toBeInTheDocument()
        expect(screen.getByText('Test user A')).toBeInTheDocument()
        expect(screen.getByText('2021-01-01T13:47:23.308833+00:00')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('back-to-main'))
        expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('link-b39ec6cc-9d85-458d-aa0e-00000000000b')) // Test user B
        expect(await screen.findByText('User detail')).toBeInTheDocument()
        expect(screen.getByText('Test user B')).toBeInTheDocument()
        expect(screen.getByText('2021-02-02T13:47:23.308833+00:00')).toBeInTheDocument()
    })
})
