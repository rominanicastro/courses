// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const Profile = require('./../models/Profile');
const Team = require('./../models/Team');

router.get('/profile', (req, res) => {
	let filters = req.query;
	if (req.query.age != null) {
		filters = {
			age: { $gt: req.query.age }
		}; 
	}
	Profile.find(filters) // Or maybe filter a specific value. Eg. position: 'Fullstack developer'
								// You can filter with mongo keys as {$gt: number} (greater than),
								// {$lt: number} (lesser than) or use more than 1 filter -> age: { $gt: 20, $lt: 50 }}
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err
		})
	});
})

router.get('/profile/:id', (req, res) => {
	const id = req.params.id;
	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: `Profile id ${id} not found.`
		})
	})
});

router.post('/profile', (req, res) => {
	Profile.create(req.body)
		.then(profile => {
			res.json({
				confirmation: 'success',
				data: profile
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		});
})

// NON-RESTful
router.get('/profile/update', (req, res) => {
	const query = req.query; // require id and key=value (value you want to update)
	const profileId =  query.id;
	delete query['id'];
	
	Profile.findByIdAndUpdate(profileId, query, {new:true}) // if you dont pass new attribute, mongo by default will return the profile
															// before update it. So if you write: new:true it will return the profile updated.
		.then(profile => {
			res.json({
				confirmation: 'success',
				data: profile
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		});
})

router.get('/profile/remove', (req, res) => {
	
})

router.get('/team', (req, res) => {
	Team.find(req.query)
		.then(teams => {
			res.json({
				confirmation: 'success',
				data: teams
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err
			})
		});
})

router.post('/team', (req, res) => {
	Team.create(req.body)
		.then(team => {
			res.json({
				confirmation: 'success',
				data: team
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		});
})


module.exports = router
