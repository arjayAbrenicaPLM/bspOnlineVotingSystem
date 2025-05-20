import { query } from '../../index.js'

export const getData = async (user) => {
  try {
    const sql = `SELECT user_name, user_role, region FROM users
                WHERE user_id = $1`
    const { rows } = await query(sql, [user])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getAllData = async () => {
  try {
      const sql = `SELECT user_name, user_role, region, user_email, user_id FROM users
                  ORDER BY user_role ASC, user_name ASC`
    const { rows } = await query(sql)
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getVoters = async () => {
  try {
    const sql = `SELECT user_id, voter_name, has_voted, user_email, region FROM votes
                JOIN users ON votes.vote_id = users.user_id ORDER BY voter_name ASC`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const checkCandidate = async (name, region) => {
  try { 
    const sql = `SELECT * FROM candidates
                WHERE candidate_name = $1 AND candidate_region = $2`
    const { rows } = await query(sql, [name, region])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }  
}

export const addCandidate = async (name, region) => {
  try {
    const sql = `INSERT INTO candidates (candidate_name, candidate_region)
                VALUES ($1, $2) RETURNING *`
    const { rows } = await query(sql, [name, region])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const viewCandidates = async () => {
  try {
    const sql = `SELECT candidate_name, candidate_region, total_votes, candidate_id
              FROM candidates ORDER BY candidate_name ASC`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const passBallot = async (vote_1, vote_2, vote_3, vote_4, hasVoted, stubNum, uid) => {
  try {
    const sql = `UPDATE votes SET vote_1 = $1, vote_2 = $2, vote_3 = $3, vote_4 = $4, has_voted = $5, stub_number = $6 WHERE vote_id = $7 RETURNING *`
    const { rows } = await query(sql, [vote_1, vote_2, vote_3, vote_4, hasVoted, stubNum, uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const hasVoted = async (uid) => {
  try {
    const sql = `SELECT has_voted FROM votes
                WHERE vote_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const resetVote = async (uid) => {
  try {
    const sql = `UPDATE votes SET has_voted = 'false',
                vote_1 = null, vote_2 = null, vote_3 = null, vote_4 = null
                WHERE vote_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getTotalVotes = async (name) => {
  try {
    const sql = `SELECT total_votes FROM candidates
                WHERE candidate_name = $1`
    const { rows } = await query(sql, [name])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const updateTotalVotes = async (totalVotes, name) => {
  try {
    const sql = `UPDATE candidates SET total_votes = $1
                WHERE candidate_name = $2`
    const { rows } = await query(sql, [totalVotes, name])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getTop4 = async () => {
  try {
    const sql = `SELECT candidate_name, candidate_region, total_votes 
                FROM candidates ORDER BY total_votes DESC, candidate_name ASC
                LIMIT 4`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getVotesBy = async (uid) => {
  try {
    const sql = `SELECT vote_1, vote_2, vote_3, vote_4 FROM votes
                WHERE vote_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const totalVoters = async () => {
  try {
    const sql = `SELECT COUNT(*) FROM users WHERE user_role = 'Voting Delegate' `
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const totalDoneVoting = async () => {
  try {
    const sql = `SELECT COUNT(*) FROM votes WHERE has_voted = 'true'`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const votersByRegion = async () => {
  try {
    const sql = `SELECT users.region, COUNT(votes.vote_uuid)::INTEGER AS total_votes
                FROM votes 
                JOIN users ON votes.vote_id = users.user_id 
                GROUP BY users.region`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const removeCandidate = async (uid) => {
  try {
    const sql = `DELETE FROM candidates
                WHERE candidate_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const removeUser = async (uid) => {
  try {
    const sql = `DELETE FROM users
                WHERE user_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getResults = async () => {
  try {
    const sql = `SELECT candidate_name, candidate_region, total_votes 
                FROM candidates ORDER BY total_votes DESC, candidate_name ASC`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const searchCandidate = async(searchTerm) => {
  try {
    const {rows} = await query(
      `SELECT candidate_name, candidate_region, total_votes, candidate_id
        FROM candidates WHERE candidate_name ILIKE $1 OR candidate_region ILIKE $1 ORDER BY candidate_name ASC`,
      [`%${searchTerm}%`])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const searchVoter = async(searchTerm) => {
  try {
    const {rows} = await query(
      `SELECT user_id, voter_name, has_voted, user_email, region FROM votes
      JOIN users ON votes.vote_id = users.user_id 
      WHERE voter_name ILIKE $1 OR user_email ILIKE $1 ORDER BY region ASC`,
      [`%${searchTerm}%`])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const searchUser = async(searchTerm) => {
  try {
    const {rows} = await query(
      `SELECT user_name, user_role, region, user_email, user_id
        FROM users WHERE user_name ILIKE $1 OR region ILIKE $1 OR user_email ILIKE $1 OR user_role ILIKE $1 
        ORDER BY user_role ASC, user_name ASC`,
      [`%${searchTerm}%`])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const getVote = async(uid) => {
  try {
    const sql = `SELECT candidate_name, candidate_region FROM votes
              JOIN candidates ON votes.vote_1 = candidates.candidate_name OR
              votes.vote_2 = candidates.candidate_name OR
              votes.vote_3 = candidates.candidate_name OR
              votes.vote_4 = candidates.candidate_name  
              WHERE vote_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const stubNum = async(uid) => {
  try {
    const sql = `SELECT stub_number, region FROM votes
                JOIN users ON votes.voter_name = users.user_name  
                WHERE vote_id = $1`
    const { rows } = await query(sql, [uid])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const getCandidatesByRegion = async() => {
  try {
    const sql = `SELECT candidate_region, COUNT (*) 
                FROM candidates GROUP BY candidate_region`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const getTotalCandidates = async() => {
  try {
    const sql = `SELECT COUNT (*) FROM candidates`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}

export const getStatsByRegion = async () => {
  try {
    const sql = `SELECT region, 
                COUNT(user_id) AS registered_voters, 
                SUM(has_voted::int) AS votes_cast
                FROM users JOIN votes ON votes.vote_id = users.user_id
                WHERE user_role = 'Voting Delegate' GROUP BY region`
    const { rows } = await query(sql, [])
    return rows
  } catch (error) {
    console.error("Database Query Error:", error)
    throw error
  }
}