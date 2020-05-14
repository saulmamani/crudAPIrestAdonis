'use strict'

const Directorio = use('App/Models/Directorio')
const { validateAll } = use('Validator')

class DirectorioController {
  async index ({ request, response }) {
    const input = await request.all();
    if(input.txtBuscar !== undefined){
      return await Directorio.query()
                              .where('telefono', input.txtBuscar)
                              .orWhere('nombre_completo', 'like', '%' + input.txtBuscar + '%')
                              .fetch();
    }
    else{
      return await Directorio.all();
    }    
  }

  async store ({ request, response }) {
    //validar
    const validation = await this.validar(request.all());
    if (validation.fails()) {
      return validation.messages()
    }

    const directorio = await Directorio.create(request.all());
    return {
      res: true,
      directorio: directorio,
      message: "Registro insertado correctamente"
    }
  }

  async show ({ params, request, response }) {
    return await Directorio.findOrFail(params.id);
  }

  async update ({ params, request, response }) {
    //validar
    const validation = await this.validar(request.all(), params.id);

    if (validation.fails()) {
      return validation.messages()
    }

    await Directorio.query().where('id', params.id).update(request.all());
    return {
      res: true,
      message: "Registro modificado correctamente"
    }
  }

  async destroy ({ params, request, response }) {
    const directorio = await Directorio.findOrFail(params.id);
    await directorio.delete();
    return {
      res: true,
      message: "Registro eliminado correctamente"
    }
  }

  async validar(input, id = null)
  {
    let ruleUpdate = id === null ? '' : ',id,' + id;
    return await validateAll(input, {
        nombre_completo: 'required|min:3|max:100',
        telefono: 'required|unique:directorios,telefono' + ruleUpdate
    });
  }
}

module.exports = DirectorioController
