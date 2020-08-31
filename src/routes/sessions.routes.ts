import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import AuthenticateUserService from '../services/AuthenticateUserService'
const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body
        const authenticateUser = new AuthenticateUserService()
        const { user, token } = await authenticateUser.execute({
            email,
            password
        })
        return response.status(200).json({ user, token })
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})
export default sessionRouter