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
end

File.read!("./day2.txt")
|> String.trim()
|> String.split(",", trim: true)
|> Enum.map(&String.to_integer/1)
|> List.replace_at(1, 12)
|> List.replace_at(2, 2)
|> Starship.solve()
|> IO.puts()
