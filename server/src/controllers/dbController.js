import * as dbServices from '../services/dbServices.js'

export const getData = async (req, res) => {
  try {
    const result = await dbServices.getData(req.user)
    return res.status(200).json({user: result})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const getAllData = async (req, res) => {
  try {
    const result = await dbServices.getAllData()
    return res.status(200).json({user: result})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const getVoters = async (req, res) => {
  try {
    const result = await dbServices.getVoters()
    return res.status(200).json({user: result})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const addCandidate = async (req, res) => {
  try {
    const { name, region } = req.body

    // Check if candidate exists
    const doesExist = await dbServices.checkCandidate(name, region)

    if (doesExist != 0) {
      return res.status(401).json({ message: "Candidate Already Exists" })
    }

    // Register new candidate
    const result = await dbServices.addCandidate(name, region)

    return res.status(201).json({ message: "Candidate Added", result })
  
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const viewCandidates = async (req, res) => {
  try{
    const result = await dbServices.viewCandidates()
    return res.status(200).json({candidates: result})
  } catch (error){
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const passBallot = async (req, res) => {
  try{
    const vote_1 = req.body[0]
    const vote_2 = req.body[1]
    const vote_3 = req.body[2]
    const vote_4 = req.body[3]
    const stub_number = req.body[req.body.length - 1]
    const result = await dbServices.passBallot(vote_1, vote_2, vote_3, vote_4, true, stub_number, req.user)
    for (let x = 0; x <= 3; x++){
      if(req.body[x] === undefined) continue

      const data = await dbServices.getTotalVotes(req.body[x])
      let voteCount = data[0].total_votes
      voteCount += 1

      const addVote = await dbServices.updateTotalVotes(voteCount, req.body[x])
    }
    return res.status(200).json({candidates: result})
  } catch (error){
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const hasVoted = async (req, res) => {
  try {
    const result = await dbServices.hasVoted(req.user)
    return res.status(200).json({voteStatus: result})
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const resetVote = async (req, res) => {
  try {
    const { uid } = req.body

    const votes = await dbServices.getVotesBy(uid)

    const voteValues = {};

    for (const key in votes[0]) {
      voteValues[key] = votes[0][key]
    }

    for (const key in voteValues) {
      if (voteValues[key] === null) continue

      const data = await dbServices.getTotalVotes(voteValues[key])
      let voteCount = data[0].total_votes
      voteCount -= 1

      const subtractVote = await dbServices.updateTotalVotes(voteCount, voteValues[key])
    }

    const result = await dbServices.resetVote(uid)

    return res.status(200).json({message: "Removed Vote"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const getTop4 = async (req, res) => {
  try {
    const result = await dbServices.getTop4()
    return res.status(200).json({top4: result})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const voteRatio = async (req, res) => {
  try {
    const total = await dbServices.totalVoters()
    const done = await dbServices.totalDoneVoting()

    const totalVoters = total[0].count
    const doneVoting = done[0].count
    return res.status(200).json({total: totalVoters, done: doneVoting})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const votersByRegion = async (req, res) => {
  try {
    const results = await dbServices.votersByRegion()
    return res.status(200).json({results: results})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const removeCandidate = async (req, res) => {
  try {
    const { uid } = req.body
    const result = await dbServices.removeCandidate(uid)
    return res.status(201).json({message: "Candidate Removed Succesfully"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const removeUser = async (req, res) => {
  try {
    const { uid } = req.body
    const result = await dbServices.removeUser(uid)
    return res.status(201).json({message: "User Removed Succesfully"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const getResults = async (req, res) => {
  try {
    const result = await dbServices.getResults()
    return res.status(200).json({result: result})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const searchCandidate = async (req, res) => {
  try{
    const searchTerm = req.query.q
    const candidate = await dbServices.searchCandidate(searchTerm)
    res.status(200).json({candidates: candidate})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const searchVoter = async (req, res) => {
  try{
    const searchTerm = req.query.q
    const candidate = await dbServices.searchVoter(searchTerm)
    res.status(200).json({candidates: candidate})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const searchUser = async (req, res) => {
  try{
    const searchTerm = req.query.q
    const user = await dbServices.searchUser(searchTerm)
    res.status(200).json({users: user})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getVote = async (req, res) => {
  try{
    const result = await dbServices.getVote(req.user)
    res.status(200).json({result: result})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const stubNum = async (req, res) => {
  try{
    const result = await dbServices.stubNum(req.user)
    res.status(200).json({result: result})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getCandidatesByRegion = async (req, res) => {
  try{
    const result = await dbServices.getCandidatesByRegion()
    res.status(200).json({result: result})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getTotalCandidates = async (req, res) => {
  try{
    const result = await dbServices.getTotalCandidates()
    res.status(200).json({result: result})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}

export const getStatsByRegion = async (req, res) => {
  try{
    const result = await dbServices.getStatsByRegion()
    res.status(200).json({result: result})
  } catch (err){
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}