import express from 'express'
import authorize from '../middleware/authorize.js'
import * as dbController from '../controllers/dbController.js'

const router = express.Router()

router.get('/', authorize, dbController.getData)

router.get('/all_data', authorize, dbController.getAllData)

router.get('/voters', authorize, dbController.getVoters)

router.post('/new_candidate', authorize, dbController.addCandidate)

router.get('/candidates', authorize, dbController.viewCandidates)

router.put('/ballot', authorize, dbController.passBallot)

router.get('/voted', authorize, dbController.hasVoted)

router.put('/reset_vote', authorize, dbController.resetVote)

router.get('/top4', authorize, dbController.getTop4)

router.get('/ratio', authorize, dbController.voteRatio)

router.get('/region', authorize, dbController.votersByRegion)

router.delete('/remove_candidate', authorize, dbController.removeCandidate)

router.delete('/remove_user', authorize, dbController.removeUser)

router.get('/results', authorize, dbController.getResults)

router.get('/candidate/search', authorize, dbController.searchCandidate)

router.get('/voter/search', authorize, dbController.searchVoter)

router.get('/user/search', authorize, dbController.searchUser)

router.get('/existing_vote', authorize, dbController.getVote)

router.get('/stub_num', authorize, dbController.stubNum)

router.get('/candidate/region', authorize, dbController.getCandidatesByRegion)

router.get('/candidate/total', authorize, dbController.getTotalCandidates)

router.get('/region/stats', authorize, dbController.getStatsByRegion)

export default router