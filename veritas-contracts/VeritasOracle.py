# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *
import typing

class VeritasOracle(gl.Contract):
    # State variables
    claims: dict
    claim_counter: int

    def __init__(self):
        self.claims = {}
        self.claim_counter = 0

    @gl.public.write
    def submit_claim(self, claim_text: str, reference_url: str) -> int:
        """
        Users submit a claim to be verified.
        """
        self.claim_counter += 1
        claim_id = self.claim_counter
        self.claims[claim_id] = {
            "claim_text": claim_text,
            "reference_url": reference_url,
            "status": "PENDING",
            "consensus": ""
        }
        return claim_id

    @gl.public.write
    def adjudicate_claim(self, claim_id: int) -> str:
        """
        Validators run this function to adjudicate the truthfulness of a claim using LLMs.
        """
        if claim_id not in self.claims:
            return "ERROR: Claim does not exist"
        
        claim = self.claims[claim_id]
        if claim["status"] != "PENDING":
            return claim["consensus"]

        # This defines the non-deterministic input generation for the LLM
        def get_input() -> str:
            # In a real scenario, we would use gl.eq_principle.strict_eq to fetch the URL content
            return f"Claim: {claim['claim_text']}\nReference URL: {claim['reference_url']}"

        # Step 1: LLM Consensus using GenLayer's Equivalence Principle
        # The leader runs the LLM prompt; validators judge the result against the criteria
        consensus_result = gl.eq_principle.prompt_non_comparative(
            get_input,
            task="Analyze the provided claim and reference URL. Determine if the claim is TRUE or FALSE based on the evidence.",
            criteria="""
                The response must be exactly one word: TRUE or FALSE.
                The response must reflect whether the claim is factually accurate based on general knowledge or the reference.
            """,
        )

        # Step 2: Update state based on consensus
        self.claims[claim_id]["status"] = "ADJUDICATED"
        self.claims[claim_id]["consensus"] = consensus_result
        
        return consensus_result

    @gl.public.view
    def get_claim(self, claim_id: int) -> typing.Any:
        if claim_id in self.claims:
            return self.claims[claim_id]
        return None
