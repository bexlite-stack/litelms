FROM oven/bun

WORKDIR /app

COPY . .
RUN bunx prisma generate

CMD ["bun", "run", "start"]

EXPOSE 8805
