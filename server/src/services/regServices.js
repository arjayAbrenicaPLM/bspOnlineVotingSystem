import { query } from '../../index.js'

// SQL to check if user exists
export const checkExists = async (email) => {
  try {
    const sql = `SELECT * FROM users WHERE user_email = $1`
    const { rows } = await query(sql, [email])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

// SQL to add new user to db
export const registerUser = async (name, email, password, role, region) => {
  try {
    const sql = `INSERT INTO users (user_name, user_email, user_password, user_role, region)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const { rows } = await query(sql, [name, email, password, role, region])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

export const getPassword = async (id) => {
  try {
    const sql = `SELECT user_password FROM public.users
                  WHERE user_id = $1  `
    const { rows } = await query(sql, [id])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

export const changePassword = async (password, id) => {
  try {
    const sql = `UPDATE users SET user_password = $1
                WHERE user_id = $2`
    const { rows } = await query(sql, [password, id])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}

export const addVoter = async (name, user_id, stub_num) => {
  try {
    const sql = `INSERT INTO votes (voter_name, vote_id, stub_number) 
                VALUES ($1, $2, $3) RETURNING *`
    const { rows } = await query(sql, [name, user_id, stub_num])
    return rows
  } catch (error) {
    console.log(error.messsage)
    throw error
  }
}