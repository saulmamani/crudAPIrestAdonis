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
    let input = request.all();
    
    //validar
    const validation = await this.validar(input);
    if (validation.fails()) {
      return validation.messages()
    }

    const directorio = await Directorio.create(input);

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

  async cargarFoto({request, response, params}){
    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    });

    const nombreArchivo = params.id + '.' + avatar.extname;
    await avatar.move('./public/fotografias', {
      name: nombreArchivo,
      overwrite: true
    })

    if(!avatar.moved()){
      return response.status(422).send({
        res: false,
        message: avatar.error()
      })
    }

    const directorio = await Directorio.findOrFail(params.id);
    directorio.url_foto = nombreArchivo;
    await directorio.save();

    return response.status(200).send({
      res: true,
      message: "Foto registrada correctamente!"
    })
  }
}

module.exports = DirectorioController
