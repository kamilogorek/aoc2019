defmodule Starship do
  def solve(input) do
    solve(input, 0)
  end

  def solve(input, current_index) do
    [op, p1, p2, dest] = Enum.slice(input, current_index, 4)

    case op do
      1 ->
        solve(
          List.replace_at(input, dest, Enum.at(input, p1) + Enum.at(input, p2)),
          current_index + 4
        )

      2 ->
        solve(
          List.replace_at(input, dest, Enum.at(input, p1) * Enum.at(input, p2)),
          current_index + 4
        )

      99 ->
        Enum.at(input, 0)
    end
  end

  def force(input) do
    for(i <- 0..99, j <- 0..99, do: [i, j])
    |> Enum.find(fn [i, j] ->
      input
      |> List.replace_at(1, i)
      |> List.replace_at(2, j)
      |> Starship.solve()
      |> (&(&1 == 19_690_720)).()
    end)
    |> (fn [i, j] -> 100 * i + j end).()
  end
end

File.read!("./day2.txt")
|> String.trim()
|> String.split(",", trim: true)
|> Enum.map(&String.to_integer/1)
|> Starship.force()
|> IO.puts()
