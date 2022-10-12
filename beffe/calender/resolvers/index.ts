import { createCalenderEvent, deleteCalenderEvent, getCalenderEvent, updateCalenderEvent } from "../services";

const resolvers = {
    Query: {
        CalenderEvent(root: any, args: any, context: any) {
            return getCalenderEvent(args.userID);
      },
    },
    Mutation: {
        CreateCalenderEvent(root: any, args: any, context: any) {
            return createCalenderEvent(args.request);
        },
        UpdateCalenderEvent(root: any, args: any, context: any) {
            return updateCalenderEvent(args.request);
        },
        DeleteCalenderEvent(root: any, args: any, context: any) {
            return deleteCalenderEvent(args.eventID);
        }
    }
}

export default resolvers;