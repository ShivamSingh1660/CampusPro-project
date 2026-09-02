export type Difficulty = "Easy" | "Medium" | "Hard";
export type Status = "Solved" | "Unsolved";

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

export interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  acceptance: number;
  starterCode: Record<string, string>;
  testCases: TestCase[];
  solved: boolean;
  bookmarked: boolean;
}

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Arrays", "Hashing"],
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    acceptance: 48.5,
    starterCode: {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { id: "tc2", input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
      { id: "tc3", input: "[3,3]\n6", expectedOutput: "[0,1]" }
    ],
    solved: true,
    bookmarked: false
  },
  {
    id: 20,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["Strings", "Stack"],
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.",
    examples: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    acceptance: 40.2,
    starterCode: {
      "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        ",
      "cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "\"()\"", expectedOutput: "true" },
      { id: "tc2", input: "\"()[]{}\"", expectedOutput: "true" },
      { id: "tc3", input: "\"(]\"", expectedOutput: "false" }
    ],
    solved: false,
    bookmarked: true
  },
  {
    id: 53,
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["Arrays", "Dynamic Programming"],
    description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nA subarray is a contiguous part of an array.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum = 6." },
      { input: "nums = [1]", output: "1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    acceptance: 50.1,
    starterCode: {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};",
      "python": "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ",
      "cpp": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { id: "tc2", input: "[1]", expectedOutput: "1" },
      { id: "tc3", input: "[5,4,-1,7,8]", expectedOutput: "23" }
    ],
    solved: false,
    bookmarked: false
  },
  {
    id: 206,
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topics: ["Linked List"],
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    acceptance: 71.2,
    starterCode: {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ",
      "cpp": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { id: "tc2", input: "[1,2]", expectedOutput: "[2,1]" },
      { id: "tc3", input: "[]", expectedOutput: "[]" }
    ],
    solved: true,
    bookmarked: false
  },
  {
    id: 300,
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topics: ["Arrays", "Dynamic Programming", "Binary Search"],
    description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\nA subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    acceptance: 50.8,
    starterCode: {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = function(nums) {\n    \n};",
      "python": "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        ",
      "cpp": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4" },
      { id: "tc2", input: "[0,1,0,3,2,3]", expectedOutput: "4" },
      { id: "tc3", input: "[7,7,7,7,7,7,7]", expectedOutput: "1" }
    ],
    solved: false,
    bookmarked: true
  },
  {
    id: 200,
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topics: ["Arrays", "Graphs"],
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples: [
      { input: "grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]", output: "1" },
      { input: "grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]", output: "3" }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    acceptance: 55.4,
    starterCode: {
      "javascript": "/**\n * @param {character[][]} grid\n * @return {number}\n */\nvar numIslands = function(grid) {\n    \n};",
      "python": "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        ",
      "cpp": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};"
    },
    testCases: [
      { id: "tc1", input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", expectedOutput: "1" },
      { id: "tc2", input: "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", expectedOutput: "3" }
    ],
    solved: false,
    bookmarked: false
  }
];
