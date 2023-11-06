import HttpError from '@wasp/core/HttpError.js'

export const createUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.User.create({
    data: {
      username: args.username,
      password: args.password,
      role: args.role, 
      team: { connect: { id: args.teamId } } 
    }
  });
}

export const createMatch = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Implement the creation of a new match with the provided details
  // and return the created match
}

export const createMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Message.create({
    data: {
      text: args.text,
      sender: { connect: { id: context.user.id } },
      recipient: { connect: { id: args.recipientId } }
    }
  });
}

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Task.create({
    data: {
      description: args.description,
      user: { connect: { id: context.user.id } }
    }
  })
}

export const createStat = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Stat.create({
    data: {
      value: args.value,
      type: args.type,
      user: { connect: { id: args.userId } },
      match: { connect: { id: args.matchId } }
    }
  })
}

export const createNotification = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { title, message } = args;

  return context.entities.Notification.create({
    data: {
      title,
      message,
      user: { connect: { id: context.user.id } }
    }
  });
}