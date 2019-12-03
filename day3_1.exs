defmodule Starship do
  def solve(input) do
    input
    |> Enum.map(&create_grid(&1))
    |> Enum.map(&Map.fetch!(&1, :visited))
    |> (fn [wire1, wire2] -> MapSet.intersection(wire1, wire2) end).()
    |> Enum.map(&(abs(elem(&1, 0)) + abs(elem(&1, 1))))
    |> Enum.min()
  end

  def create_grid(wire) do
    Enum.reduce(wire, %{pos: {0, 0}, visited: MapSet.new()}, &move(&1, &2))
  end

  def move(seq, grid) do
    op = String.first(seq)
    dist = String.slice(seq, 1..-1) |> String.to_integer()

    case op do
      "R" -> move_in_dir(grid, 0, dist)
      "L" -> move_in_dir(grid, 0, -dist)
      "U" -> move_in_dir(grid, 1, dist)
      "D" -> move_in_dir(grid, 1, -dist)
    end
  end

  def move_in_dir(grid, _dir, 0) do
    grid
  end

  def move_in_dir(grid, 0, vel) when vel < 0 do
    new_pos = put_elem(grid[:pos], 0, elem(grid[:pos], 0) - 1)
    new_grid = %{pos: new_pos, visited: MapSet.put(grid[:visited], new_pos)}
    move_in_dir(new_grid, 0, vel + 1)
  end

  def move_in_dir(grid, 0, vel) when vel > 0 do
    new_pos = put_elem(grid[:pos], 0, elem(grid[:pos], 0) + 1)
    new_grid = %{pos: new_pos, visited: MapSet.put(grid[:visited], new_pos)}
    move_in_dir(new_grid, 0, vel - 1)
  end

  def move_in_dir(grid, 1, vel) when vel < 0 do
    new_pos = put_elem(grid[:pos], 1, elem(grid[:pos], 1) - 1)
    new_grid = %{pos: new_pos, visited: MapSet.put(grid[:visited], new_pos)}
    move_in_dir(new_grid, 1, vel + 1)
  end

  def move_in_dir(grid, 1, vel) when vel > 0 do
    new_pos = put_elem(grid[:pos], 1, elem(grid[:pos], 1) + 1)
    new_grid = %{pos: new_pos, visited: MapSet.put(grid[:visited], new_pos)}
    move_in_dir(new_grid, 1, vel - 1)
  end
end

File.read!("./day3.txt")
|> String.trim()
|> String.split("\n", trim: true)
|> Enum.map(fn x -> String.split(x, ",", trim: true) end)
|> Starship.solve()
|> IO.puts()
