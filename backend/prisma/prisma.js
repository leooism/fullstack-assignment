const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const AppError = require("../utils/AppError");

const prisma = new PrismaClient().$extends({
	model: {
		user: {
			async signup(
				email,
				password,
				confirmPassword,
				f_name,
				l_name,
				profileImage,
				role
			) {
				if (confirmPassword !== password) {
					throw new AppError("Password didn't match", 404);
				}

				const hashPassword = await bcrypt.hash(password, 10);

				const isUserExist = await prisma.user.isDataExist("email", email);
				if (isUserExist) throw new AppError("User already exist", 200);

				return await prisma.user.create({
					data: {
						email,
						password: hashPassword,
						f_name,
						l_name,
						role,
						profileImage,
						cart: {
							create: {
								created_at: new Date().toISOString(),
								totalPrice: 0,
								quantity: 0,
							},
						},
					},
					include: {
						cart: {
							include: {
								cartItem: true,
							},
						},
					},
				});
			},

			async login(email, password) {
				if (email === "" || password === "")
					throw new AppError("Please provide all the details");

				//check if user exist
				let user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});
				if (!user) throw new AppError("No user with this detail", 404);

				const isPasswordCorrect = await bcrypt.compare(password, user.password);
				if (!isPasswordCorrect)
					throw new AppError("Either password or email is incorrect");

				//Remove least required field from user
				const modifiedUser = { ...user };
				[
					"password",
					"confirmPassword",
					"passwordExpireTime",
					"passwordChangedAt",
					"passwordResetToken",
				].forEach((key) => delete modifiedUser[key]);

				return modifiedUser;
			},
		},
		$allModels: {
			async isDataExist(uniqueIds, data) {
				// const getCurrentModel = Prisma.getExtensionContext(this);
				const isUserAlreadyExist = await prisma.user.findUnique({
					where: {
						[uniqueIds]: data,
					},
				});
				return isUserAlreadyExist;
			},
		},
	},

	result: {
		user: {
			//After user is in password reset, save password ResetTOken and password Expire time

			saveResetToken: {
				needs: { id: true },
				compute(user) {
					return () => {
						return prisma.user.update({
							where: { id: user.id },
							data: {
								passwordResetToken: user.passwordResetToken,
								passwordExpireTime: `${+Date.now() + 60000 * 10}`,
							},
						});
					};
				},
			},

			/* 
		
		* 	//Virtual field
			// fullname: {
			// 	needs: { f_name: true, l_name: true },
			// 	compute(user) {
			// 		return `${user.f_name} ${user.l_name}`;
			// 	},
			// },
		
		
		*/
			updatePassword: {
				needs: { id: true },
				compute(user) {
					return async () => {
						//Check if the pssword Reset Token is expired
						if (+Date.now() > +user.passwordExpireTime)
							throw new AppError("Token Expired");

						const hashPassword = await bcrypt.hash(user.password, 10);
						return prisma.user.update({
							where: {
								id: user.id,
							},
							data: {
								password: hashPassword,
								passwordResetToken: null,
								passwordExpireTime: null,
								passwordChangedAt: new Date().toISOString(),
							},
						});
					};
				},
			},
		},

		shoppingCartItem: {
			save: {
				needs: { id: true },
				compute({ quantity, totalPrice, id }) {
					return () =>
						prisma.shoppingCartItem.update({
							where: {
								id: id,
							},
							data: {
								quantity,
								totalPrice,
							},
						});
				},
			},
		},
	},
});

module.exports = prisma;
