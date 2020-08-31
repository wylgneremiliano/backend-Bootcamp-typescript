import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
const usersRouter = Router()


// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object 


usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body
        const createUser = new CreateUserService()
        const user = await createUser.execute({
            name,
            email,
            password
        })
        delete user.password
        return response.status(201).json({ user: user })
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})
export default usersRouter