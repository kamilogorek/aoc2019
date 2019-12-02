defmodule Starship do
  def required_fuel(mass) do
    Integer.floor_div(mass, 3) - 2
  end

  def fuel_correction(mass) do
    fuel_correction(mass, mass)
  end

  def fuel_correction(mass, total) do
    fuel = required_fuel(mass)
    if fuel <= 0, do: total, else: fuel_correction(fuel, total + fuel)
  end
end

File.read!("./day1.txt")
|> String.split("\n", trim: true)
|> Enum.map(&String.to_integer/1)
|> Enum.map(&Starship.required_fuel/1)
|> Enum.map(&Starship.fuel_correction/1)
|> Enum.sum()
|> IO.puts()
