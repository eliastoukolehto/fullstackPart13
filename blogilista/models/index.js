const Blog = require('./blog')
const ReadingLists = require('./reading_lists')
const User = require('./user')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'reading_users' })

module.exports = {
  Blog, User, ReadingLists
}