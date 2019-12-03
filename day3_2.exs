defmodule Starship do
  def solve(input) do
    grid = Enum.map(input, &create_grid(&1))
    [wire1, wire2] = Enum.map(grid, &Map.fetch!(&1, :visited))

    MapSet.intersection(wire1, wire2)
    |> Enum.map(fn pos ->
      Enum.map(grid, &Map.fetch!(&1, :steps))
      |> Enum.map(&Map.fetch!(&1, Enum.join(Tuple.to_list(pos), ",")))
      |> Enum.chunk_every(2)
      |> Enum.map(&Enum.sum(&1))
      |> Enum.min()
    end)
    |> Enum.min()
  end

  def create_grid(wire) do
    Enum.reduce(
      wire,
      %{pos: {0, 0}, visited: MapSet.new(), total_steps: 0, steps: Map.new()},
      &move(&1, &2)
    )
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
    move_in_dir(create_new_grid(grid, new_pos), 0, vel + 1)
  end

  def move_in_dir(grid, 0, vel) when vel > 0 do
    new_pos = put_elem(grid[:pos], 0, elem(grid[:pos], 0) + 1)
    move_in_dir(create_new_grid(grid, new_pos), 0, vel - 1)
  end

  def move_in_dir(grid, 1, vel) when vel < 0 do
    new_pos = put_elem(grid[:pos], 1, elem(grid[:pos], 1) - 1)
    move_in_dir(create_new_grid(grid, new_pos), 1, vel + 1)
  end

  def move_in_dir(grid, 1, vel) when vel > 0 do
    new_pos = put_elem(grid[:pos], 1, elem(grid[:pos], 1) + 1)
    move_in_dir(create_new_grid(grid, new_pos), 1, vel - 1)
  end

  def create_new_grid(grid, new_pos) do
    marker = Enum.join(Tuple.to_list(new_pos), ",")

    %{
      pos: new_pos,
      visited: MapSet.put(grid[:visited], new_pos),
      total_steps: grid[:total_steps] + 1,
      steps:
        Map.put_new(
          grid[:steps],
          marker,
          grid[:total_steps]
        )
    }
  end
end

File.read!("./day3.txt")
|> String.trim()
|> String.split("\n", trim: true)
|> Enum.map(fn x -> String.split(x, ",", trim: true) end)
|> Starship.solve()
|> IO.puts()
