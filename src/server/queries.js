import HttpError from '@wasp/core/HttpError.js'

export const getUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.User.findUnique({
    where: { id: args.id }
  });
}

export const getMatch = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const match = await context.entities.Match.findUnique({
    where: { id },
    include: {
      teams: true,
      users: true,
      stats: true
    }
  });

  if (!match) throw new HttpError(404, 'No match with ID ' + id);

  return match;
}

export const getMessage = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const message = await context.entities.Message.findUnique({
    where: { id },
    include: {
      sender: true,
      recipient: true
    }
  });

  if (!message) throw new HttpError(404, `No message with id ${id}`);

  return message;
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });

  if (!task) throw new HttpError(404, 'No task with ID ' + args.id);

  return task;
}

export const getStat = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id } = args;

  const stat = await context.entities.Stat.findUnique({
    where: { id }
  });

  if (!stat) { throw new HttpError(404, `No stat with ID ${id}`) };

  return stat;
}

export const getNotification = async (args, context) => {
  const { id } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  const notification = await context.entities.Notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw new HttpError(404, 'Notification not found');
  }

  return notification;
}