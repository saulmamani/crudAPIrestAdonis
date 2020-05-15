'use strict'
const User = use('App/Models/User')

class UserController {
    async store ({ request, response }) {
        let input = request.all();
        await User.create(input);
    
        return response.status(200).send({
          res: true,
          message: "Usuario registrado correctamente"
        });
      }

    async login({request, response, auth}){
        let input = request.all();
        let token = await auth.withRefreshToken().attempt(input.email, input.password);
        return response.json({
            res: true,
            token: token,
            message: 'Bienvenido al sistema'
        })
    }

    async getUser({response, auth}){
        try {
            return await auth.getUser()
          } catch (error) {
            response.send('Nungun usuario autenticado')
          }
    }
    
    async logout({response, auth}){
        const apiToken = auth.getAuthHeader()

        await auth
        .authenticator('api')
        .revokeTokens([apiToken])

        response.status(200).send({
            res:true,
            message: 'Adios'
        })
    }
}

module.exports = UserController
