const { ReadingLists } = require('../models')

const readingListsRouter = require('express').Router()


readingListsRouter.post('/', async (request, response) => {
  const body = request.body
  const savedReadingList = await ReadingLists.create({
    ...body
  })

  response.status(201).json(savedReadingList)
})

readingListsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const readingList = await ReadingLists.findByPk(request.params.id)
  if (readingList) {
    readingList.set({ read: body.read })
    const updatedList = await readingList.save()
    response.json(updatedList)
  } else {
    response.status(404).end()
  }
})

module.exports = readingListsRouter