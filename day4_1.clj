(defn num-to-digit-pairs [n] (partition 2 1 (map #(Character/getNumericValue %) (str n))))

(defn increasing-only? [n] (every? (partial apply <=) n))

(defn double-digit? [n] (some (partial apply =) n))

(defn problem-filters [n] (let [p (num-to-digit-pairs n)] ((every-pred increasing-only? double-digit?) p)))

(defn solve [a b] (count (filter problem-filters (range a b))))

(println (solve 265275 781584))
