# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Property.create(name: 'Prop 1', address: '5th st', city: 'Seattle',price: 1000, lat:47.660505,  long:-122.304772)
Property.create(name: 'Prop 2', address: '6th st', city: 'Seattle',price: 3000, lat:47.611150,  long:-122.341990)
Property.create(name: 'Prop 3', address: '7th st', city: 'Seattle',price: 4000, lat:47.643660,  long:-122.319846)

