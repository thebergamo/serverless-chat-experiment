import { rest } from "msw";

// GET /messages
// POST /message
// POST /client

const messages = [
  {
    id: 1,
    sendAt: new Date(),
    user: { id: "mark_b", name: "Mark B" },
    message: "Yo Yo",
  },
  {
    id: 2,
    sendAt: new Date(),
    user: { id: "lady_d", name: "Cady D" },
    message: "Yo Yo",
  },
  {
    id: 3,
    sendAt: new Date(),
    user: { id: "jonh_w", name: "Paul W" },
    message: "Yo Yo",
  },
  {
    id: 4,
    sendAt: new Date(),
    user: { id: "mark_b", name: "Mark B" },
    message: "Yo Yo",
  },
  {
    id: 5,
    sendAt: new Date(),
    user: { id: "mary_j", name: "Mary J" },
    message: "Yo Yo",
  },
  {
    id: 6,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
  {
    id: 7,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
  {
    id: 8,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
];

export const handlers = [
  rest.post("https://api.serverless.chat/api/message", (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.get("https://api.serverless.chat/api/messages", (req, res, ctx) => {
    return res(ctx.json(messages));
  }),

  rest.post("https://api.serverless.chat/api/clients", (req, res, ctx) => {
    return res(ctx.json({ saved: true }));
  }),
];
