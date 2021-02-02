const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locations
app.use(express.static(PublicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.get('', (req,res) => {
     res.render('index', {
         name: 'Sanjeev',
         title: 'Weather'
     })
}
)

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'Sanjeev',
        title:'About' 
    }
    )
}
)

app.get('/help',(req,res) => {
    res.render('help', {
        message: 'Need help',
        contact: '9597431203',
        title: 'help',
        name: 'Sanjeev'
    }
    )

}
)
app.get('/weather', (req, res) => {
      if (!req.query.address) {
         return res.send (
              {
                  error: 'Please Enter address'
              }
          )

      }
      geocode (req.query.address, (error,{latitude,longitude,location} ={}) => {
        if (error) {
            return res.send ( {
                error
            })
       }

       forecast(latitude,longitude,(error,forecastdata) => {
           if (error) {
              return res.send({error})
           }
           res.send ( {
               forecast: forecastdata,
               location,
               address: req.query.address
           })

       })
       
      }
      )

}
)

app.get('/help/*', (req,res) => {
    res.render('404' , {
        errormessage: 'Help page Not Found',
        name: 'Sanjeev',
        title: '404'  
    })
}
)

app.get('/products', (req,res) => {
    if (!req.query.search) {
       res.send({
           error: 'You must provide a search term'
       })
    }
    else {

        res.send( {
            products: []
        })
    }
    
}
)

//app.com
//app.com/about
//app.com/help
//app.com/weather

app.get('*', (req,res) => {
      res.render('404', {
          errormessage: 'Page Not found',
          name: 'Sanjeev',
          title: '404'  
      })
})

app.listen(3000, () => {

    console.log("server is up in port 3000")

}
)