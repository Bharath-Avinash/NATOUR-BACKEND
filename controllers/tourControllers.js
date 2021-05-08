const APIFeatures = require('./../utiles/apiFeatures');
const Tour = require('./../models/tourmodels.js');

exports.top_5_cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  console.log(req.query);
  next();
};


exports.getAllTours = async (req, res) => {
  
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .page()
    .fields();

  
  try {
    const tours = await features.query;
    res.status(200).json({
      status: 'success1',
      count: tours.length,
      data: { tours }
      
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.Tour_Stats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    res.status(201).json({
      status: 'success6',
      data: { stats }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
 
  try {
    const tour = await Tour.findById(req.params.id);
  
    res.status(200).json({
      status: 'success2',
      data: { tour }
      // data  : {tour},
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success3',
      data: { newTour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true
    });
    res.status(201).json({
      status: 'success4',
      data: tour
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success5',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $lte: new Date(`${year}-12-31`),
            $gte: new Date(`${year}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
     ]);

    res.status(201).json({
      status: 'success8',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
