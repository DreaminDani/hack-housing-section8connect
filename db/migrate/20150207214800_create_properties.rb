class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :address
      t.string :city
      t.integer :price
      t.decimal :long
      t.decimal :lat

      t.timestamps
    end
  end
end
