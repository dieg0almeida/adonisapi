'use strict'

const TaskHook = exports = module.exports = {}
const Mail = use('Mail')
const Helpers = use('Helpers')

TaskHook.sendNewTaskMail = async (modelInstance) => {
  if (!modelInstance.user_id && !modelInstance.dirty.user_id) return

  const { email, username } = await modelInstance.user().fetch()
  const file = await modelInstance.file().fetch()

  const { title } = modelInstance

  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachment: !!file },
    message => {
      message
        .to(email)
        .from('diegalmeida@hotmail.com', 'Diego | Rocketseat')
        .subject('Nova tarefa para você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
