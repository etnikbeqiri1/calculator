<?php

namespace App\Http\Services;

use App\Models\CalculationHistory;
use App\Models\User;
use DateTime;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class HistoryService
{


    public function store(string $expression, User $user, float $result): void
    {
       if ($this->checkAndUpdate($expression, $user->id)) {
           $history = new CalculationHistory();
           $history->user_id = $user->id;
           $history->expr = $expression;
           $history->result = $result;
           try {
               $history->save();
               $history->push();
           } catch (\Exception $exception){
               Log::critical($exception->getMessage());
           }
       }
    }

    public function checkAndUpdate(string $expression, int $userId): bool
    {
        $affectedRows = CalculationHistory::where('user_id', $userId)->where('expr', $expression)->update(
                ['updated_at' => new DateTime()]
            );
        return $affectedRows < 1;
    }

    public function getLastHistory(User $user): Collection
    {
        return CalculationHistory::where('user_id', $user->id)->orderBy('updated_at', 'desc')->limit(12)->get();
    }

    public function delete(User $user): void
    {
        CalculationHistory::where('user_id', $user->id)->delete();
    }
    public function deleteSelectedHistory(User $user, int $id): bool
    {
        return CalculationHistory::where(['user_id' => $user->id, 'id' => $id])->delete();
    }

}
