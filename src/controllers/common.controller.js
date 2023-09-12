function createday () {

}



  export async function createDocument(req, res, next, model) {
    try {
      let inforHandle = {
        createdAt : Date.now(),
      }
      if (req.user) inforHandle.createdBy = req.user.email
      let newDoc = new model.create({
        ...req.body,...inforHandle
      })
      return res.send({
        status: true,
        data: newDoc
      })
    } catch (error) {
        return res.status(500).send({
          status: false,
          ...error
        })
    }

  }
  export async function findDocument(req, res, next, model) {

  }
  export async function updateDocument(req, res, next, model) {

  }
  export async function deleteDocument(req, res, next, model) {

  }
  export async function destroyDocument(req, res, next, model) {

  }

