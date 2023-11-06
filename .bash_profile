export PATH=${PATH}:/usr/local/mysql/bin
export PATH=$PATH:/Users/isecco/.local/bin
function migrate() {
  npx prisma migrate dev --name init
  npx prisma migrate dev
}
