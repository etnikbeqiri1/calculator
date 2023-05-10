<?php

namespace App\Http\Controllers;

use App\Http\Services\CalculationService;
use App\Http\Services\HistoryService;
use App\Models\CalculationHistory;
use Illuminate\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalculationController extends Controller
{

    use Authenticatable;
    protected CalculationService $calculationService;

    public function __construct(CalculationService $calculationService)
    {
        parent::__construct();
        $this->calculationService = $calculationService;
    }


    public function calculate(Request $request)
    {
        $request->validate([
            'expr' => 'required|regex:/^((\()?\d+(\^\d+)?(\))?([\+\-\*\/\%](\()?\d+(\^\d+)?(\))?)*)$/',
        ]);

        $expr = $request->get('expr');
        $result = $this->calculationService->evaluateExpression($expr);

        (new HistoryService())->store($expr, Auth::user(), $result);

        return response()->json([
            'result' => $result,
        ]);
    }

    public function getHistory()
    {
        return (new HistoryService())->getLastHistory(Auth::user());
    }

    public function clearHistory()
    {
        (new HistoryService())->delete(Auth::user());
        return new JsonResponse();
    }

    public function deleteHistory(int $id){
        dump($id);
        $success = (new HistoryService())->deleteSelectedHistory(Auth::user(), $id);
        if ($success) {
            return new JsonResponse([], 200);
        }
        return new JsonResponse([], 404);
    }

}
