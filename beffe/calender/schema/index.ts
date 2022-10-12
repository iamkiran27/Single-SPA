import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        CalenderEvent(userID: ID!): [CalenderEvent]
    }

    extend type Mutation {
        CreateCalenderEvent(request: CreateCalenderEventRequest!): ID!
        UpdateCalenderEvent(request: UpdateCalenderEventRequest!): ID!
        DeleteCalenderEvent(eventID: ID!): ID!
    }

    type CalenderEvent {
        id: String
        title: String
        start: String
        end: String
    }

    input CreateCalenderEventRequest {
        userID: String!
        title: String
        start: String
        end: String
    }

    input UpdateCalenderEventRequest {
        eventID: String!
        title: String
        start: String
        end: String
    }
`;

export default schema;