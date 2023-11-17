import { WithId, ObjectId } from 'mongodb'
import type { Request, Response, NextFunction } from 'express'
import { getUser, increaseBattleCount } from 'users/user.service'
import { getBattle as getBattleService, addBattle, updateBattle, deleteBattle } from 'battles/battle.service'
import { getUserByAuth } from '_helpers/utils'

export const getBattle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userFullInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)

        const response: ServerResponse<WithId<Battle> | null> = { error: null, responseBody: null }

        if (userFullInfo?.cockatielId) {
            let battle: WithId<Battle> | null | undefined = await getBattleService({ cockatielId: userFullInfo?.cockatielId }, next)

            if (!battle) {
                battle = await addBattle(userFullInfo.cockatielId, next)
            } else {
                response.responseBody = battle
            }
        } else {
            response.error = 'cockatielId не найден'
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const moveBattle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userFullInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)

        const response: ServerResponse<WithId<Battle> | null> = { error: null, responseBody: null }

        if (userFullInfo?.cockatielId) {
            let battle: WithId<Battle> | null | undefined = await getBattleService({ cockatielId: userFullInfo?.cockatielId }, next)

            if (!battle) {
                response.error = 'battle не найден'
            } else if (battle.health === 0 || battle.healthAdversary === 0) {
                response.error = 'Бой завершен!'
            } else {
                const userForce = req.body.hit
                const userDodge = 100 - userForce
                const adversaryForce = Math.floor(Math.random() * 101)
                const adversaryDodge = 100 - adversaryForce

                response.responseBody = { ...battle }
                const isDodgedUser = userDodge >= Math.floor(Math.random() * 101)

                if (!isDodgedUser) {
                    response.responseBody.health = battle.health - Math.floor(adversaryForce * (Math.floor(Math.random() * 50.5) / 200))
                    response.responseBody.health = response.responseBody.health > 0 ? response.responseBody.health : 0
                }

                const isDodgedAdversary = adversaryDodge >= Math.floor(Math.random() * 101)
                if (!isDodgedAdversary && response.responseBody.health !== 0) {
                    response.responseBody.healthAdversary = battle.healthAdversary - Math.floor(userForce * (Math.floor(Math.random() * 50.5) / 200))
                    response.responseBody.healthAdversary = response.responseBody.healthAdversary > 0 ? response.responseBody.healthAdversary : 0
                }

                if (response.responseBody.health === 0 || response.responseBody.healthAdversary === 0) {
                    let isWin = false
                    if (response.responseBody.health !== 0) {
                        isWin = true
                    }

                    await increaseBattleCount(userFullInfo._id, isWin, next);
                }

                await updateBattle(battle._id, response.responseBody, next)
            }
        } else {
            response.error = 'cockatielId не найден'
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const recreateBattle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userFullInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)

        const response: ServerResponse<WithId<Battle> | null> = { error: null, responseBody: null }

        if (userFullInfo?.cockatielId) {
            let battle: WithId<Battle> | null | undefined = await getBattleService({ cockatielId: userFullInfo?.cockatielId }, next)

            if (!battle) {
                response.error = 'battle не найден'
            } else if (battle.health !== 0 && battle.healthAdversary !== 0) {
                response.error = 'Бой не завершен!'
            } else {
                await deleteBattle(battle._id, next)
                battle = await addBattle(userFullInfo.cockatielId, next)

                if (!battle) {
                    battle = await addBattle(userFullInfo.cockatielId, next)
                } else {
                    response.responseBody = battle
                }
            }
        } else {
            response.error = 'cockatielId не найден'
        }
        res.json(response)
    } catch (err) {
        next(err)
    }
}